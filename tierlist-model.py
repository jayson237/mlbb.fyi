import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.exceptions import ConvergenceWarning
import json
import warnings
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import matplotlib.pyplot as plt
from pymongo import MongoClient 
warnings.filterwarnings("ignore", category=ConvergenceWarning)

def get_tournament_stats():
    try:
        client = MongoClient('mongodb+srv://dev:ApT8FJOOl9W4FLLF@mlbbfyi.egxz5i5.mongodb.net/mlbb?retryWrites=true&w=majority')
        db = client['mlbb']     
        stats = db['TourneyStats'].find().sort('_id', -1).limit(10)
        return list(stats)
    except Exception as e:
        print(f"Failed to fetch tournament stats: {e}")

def get_heroes():
    try:
        client = MongoClient('mongodb+srv://dev:ApT8FJOOl9W4FLLF@mlbbfyi.egxz5i5.mongodb.net/mlbb?retryWrites=true&w=majority')
        db = client['mlbb']     
        stats = db['Hero'].find()
        return list(stats)
    except Exception as e:
        print(f"Failed to fetch tournament stats: {e}")


def update_heroes():
    try:
        client = MongoClient('mongodb+srv://dev:ApT8FJOOl9W4FLLF@mlbbfyi.egxz5i5.mongodb.net/mlbb?retryWrites=true&w=majority')
        db = client['mlbb']
        for entry in filtered_data:
            hero_name = entry['name']
            tier = entry['tier']
            db['Hero'].update_one(
                {'name': hero_name},
                {'$set': {'tier': tier}}
            )
        print("Hero tiers updated successfully.")
        
    except Exception as e:
        print(f"Failed to update hero tiers: {e}")


tournament_stats = get_tournament_stats()
heroes = get_heroes()

hero_tiers = {}
for entry in heroes:
    hero_name = entry["name"]
    tier = entry["tier"]
    hero_tiers[hero_name] = tier

# For jsons
# with open("index.json") as file:
#     mythic_data = json.load(file)

# hero_tiers = {}
# for entry in mythic_data:
#     hero_name = entry["name"]
#     tier = entry["tier"]
#     hero_tiers[hero_name] = tier


# Initialize empty lists to store data
heroes = []
win_rates = []
pick_rates = []
ban_presence_rates = []
pick_and_ban_rates = []
tiers = []

# Process each JSON file
for stats in tournament_stats:
    # Extract the relevant information from the data
    for entry in stats['data']:
        hero = entry['hero']
        win_rate = entry['picks']['winRate']
        pick_rate = entry['picks']['presence']
        ban_presence_rate = entry['banPresence']
        pick_and_ban_rate = entry['pickAndBanPresence']

        if win_rate == "-":
            win_rate = 0.0
        else:
            try:
                win_rate = float(win_rate.strip("%")) / 100.0
            except ValueError:
                win_rate = 0.0

        if pick_rate == "-":
            pick_rate = 0.0
        else:
            try:
                pick_rate = float(pick_rate.strip("%")) / 100.0
            except ValueError:
                pick_rate = 0.0

        if ban_presence_rate == "-":
            ban_presence_rate = 0.0
        else:
            try:
                ban_presence_rate = float(ban_presence_rate.strip("%")) / 100.0
            except ValueError:
                ban_presence_rate = 0.0

        if pick_and_ban_rate == "-":
            pick_and_ban_rate = 0.0
        else:
            try:
                pick_and_ban_rate = float(pick_and_ban_rate.strip("%")) / 100.0
            except ValueError:
                pick_and_ban_rate = 0.0

        heroes.append(hero)
        win_rates.append(win_rate)
        pick_rates.append(pick_rate)
        ban_presence_rates.append(ban_presence_rate)
        pick_and_ban_rates.append(pick_and_ban_rate)
        tiers.append(hero_tiers.get(hero, "Unknown"))

# Identify missing heroes and assign tiers from the pre-existing tiers
missing_heroes = set(hero_tiers.keys()) - set(heroes)
for hero_name in missing_heroes:
    heroes.append(hero_name)
    win_rates.append(0.0)  # Set win rate to 0.0 for missing heroes
    pick_rates.append(0.0)  # Set pick rate to 0.0 for missing heroes
    ban_presence_rates.append(0.0)  # Set ban presence rate to 0.0 for missing heroes
    pick_and_ban_rates.append(0.0)  # Set pick and ban rate to 0.0 for missing heroes
    tiers.append(hero_tiers[hero_name])  # Assign tier from the pre-existing tiers

# Create a pandas DataFrame from the extracted information
df = pd.DataFrame({
    "Hero": heroes,
    "WinRate": win_rates,
    "PickRate": pick_rates,
    "BanPresenceRate": ban_presence_rates,
    "PickAndBanRate": pick_and_ban_rates,
    "Tier": tiers
})

print(df)

# Define the desired tier order
tier_order = ["SS", "S", "A", "B", "C", "D"]

# Encode the categorical variable 'Hero' using custom label encoding
label_encoder = LabelEncoder()
df["EncodedTier"] = label_encoder.fit_transform(df["Tier"])

# Encode the categorical variable 'Tier' using custom label encoding
df["EncodedExistingTier"] = label_encoder.transform(df["Tier"])

# Scale the input features
scaler = StandardScaler()
X = df[["WinRate", "PickRate", "BanPresenceRate", "PickAndBanRate", "EncodedExistingTier"]].copy()

# Define the feature weights
feature_weights = {
    "EncodedExistingTier": 1.0,
    "PickRate": 2,
    "BanPresenceRate": 2.5,
    "PickAndBanRate": 3,
}

# Apply the feature weights
for feature, weight in feature_weights.items():
    try:
        X[feature] = X[feature].astype(float) * weight
    except ValueError:
        X[feature] = 0.0

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, df["EncodedTier"], test_size=0.2, random_state=42)

# Scale the adjusted features
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the logistic regression model with increased max_iter
model = LogisticRegression(multi_class="multinomial", solver="lbfgs", max_iter=1000)
model.fit(X_train_scaled, y_train)

# Predict the classes for the test set
y_pred = model.predict(X_test_scaled)

# Decode the predictions back to hero names
y_pred_decoded = label_encoder.inverse_transform(y_pred)

# Create a tier list based on the predictions
tier_list = {}
for i, hero_index in enumerate(X_test.index):
    hero = df.loc[hero_index, "Hero"]
    predicted_tier = y_pred_decoded[i]
    if predicted_tier not in tier_order:
        predicted_tier = "Unknown"
    tier_list[hero] = predicted_tier

# Identify missing heroes and assign tiers from the pre-existing tiers
missing_heroes = set(hero_tiers.keys()) - set(tier_list.keys())
for hero_name in missing_heroes:
    tier_list[hero_name] = hero_tiers.get(hero_name, "Unknown")

sorted_tiers = sorted(tier_list.items(), key=lambda x: x[0])
tier_list = {hero: tier for hero, tier in sorted_tiers}

filtered_tier_list = {hero: tier for hero, tier in tier_list.items() if hero != "Yi Sun-Shin"}

for hero, tier in filtered_tier_list.items():
    print(f"{hero}: {tier}")

filtered_data = [{"name": hero, "tier": tier} for hero, tier in tier_list.items() if hero != "Yi Sun-Shin"]

# Call the update_heroes function to update the Hero collection
update_heroes()

# with open('index.json', 'w') as file:
#     json.dump(filtered_data, file, indent=2)

# Calculate evaluation metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

# Print the evaluation metrics
print(f"\nEvaluation Metrics:")
print(f"Accuracy: {accuracy:.2f}")
print(f"Precision: {precision:.2f}")
print(f"Recall: {recall:.2f}")
print(f"F1 Score: {f1:.2f}")

# # Calculate the confusion matrix
# cm = confusion_matrix(y_test, y_pred)

# # Print the confusion matrix
# print("Confusion Matrix:")
# print(cm)


# # Exclude non-numeric columns from correlation calculation
# numeric_cols = df.select_dtypes(include='number')

# # Calculate the correlation matrix
# correlation_matrix = numeric_cols.corr()

# # Create a figure and axes
# fig, ax = plt.subplots(figsize=(8, 6))

# # Create a heatmap using Matplotlib
# heatmap = ax.matshow(correlation_matrix, cmap='coolwarm')

# # Add a colorbar
# cbar = plt.colorbar(heatmap)

# # Set the tick labels and positions
# ax.set_xticks(range(len(correlation_matrix.columns)))
# ax.set_yticks(range(len(correlation_matrix.columns)))
# ax.set_xticklabels(correlation_matrix.columns, rotation=45, ha='left')
# ax.set_yticklabels(correlation_matrix.columns)

# # Add the correlation values to each cell
# for i in range(len(correlation_matrix.columns)):
#     for j in range(len(correlation_matrix.columns)):
#         text = ax.text(j, i, f'{correlation_matrix.iloc[i, j]:.2f}', ha='center', va='center', color='black')

# # Set the title
# ax.set_title('Correlation Matrix of Tier List')

# # Display the graph
# plt.tight_layout()
# plt.show()


