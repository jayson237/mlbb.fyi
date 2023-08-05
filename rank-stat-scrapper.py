import json
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pymongo

# Establish a connection to MongoDB
client = pymongo.MongoClient('mongodb+srv://dev:ApT8FJOOl9W4FLLF@mlbbfyi.egxz5i5.mongodb.net/mlbb?retryWrites=true&w=majority')
db = client['mlbb']  
collection = db['hero']  

# Set up Selenium
driver = webdriver.Chrome()

# Navigate to the webpage
url = 'https://m.mobilelegends.com/id/rank'
driver.get(url)

# Wait for the page to fully load
wait = WebDriverWait(driver, 180)
wait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[2]/div/div[4]/div/div[2]/div/div[2]/ul')))

def extract_heroes(ul_element):
    # Create a new BeautifulSoup object for the <ul> content
    ul_html = ul_element.get_attribute('innerHTML')
    ul_soup = BeautifulSoup(ul_html, 'html.parser')

    # Extract all <li> elements within the <ul>
    li_elements = ul_soup.find_all('li')

    heroes = {}

    # Process or extract information from each <li> element
    for li in li_elements:
        # Find the corresponding <div> relative to the current <li> element
        div_element = li.find_next_sibling('div')

        # Check if div_element is None and assign empty string if True
        div_text = div_element.text.strip() if div_element is not None else ""

        # Extract information from the <li> and <div> elements
        hero_info = li.text.split(" ")
        hero_name = " ".join(hero_info[:-3]).strip()
        win, use, ban = hero_info[-3:]

        # Create a dictionary for the hero information
        hero_data = {
            'win': win,
            'use': use,
            'ban': ban
        }

        # Add the hero data to the heroes dictionary
        heroes[hero_name] = hero_data

    return heroes

# Find the ul_element for the "all" ul
all_ul_element = driver.find_element(By.XPATH, '/html/body/div[2]/div/div[4]/div/div[2]/div/div[2]/ul')

# Extract "all" heroes
all_heroes = extract_heroes(all_ul_element)

# Click on the "Mythic+" button to switch to another ul
mythic_button = driver.find_element(By.XPATH, '/html/body/div[2]/div/div[4]/div/div[1]/div[2]/ul/li[2]')
mythic_button.click()

# Wait for the new ul to fully load
wait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[2]/div/div[4]/div/div[2]/div/div[2]/ul')))

# Find the ul_element for the new ul
mythic_ul_element = driver.find_element(By.XPATH, '/html/body/div[2]/div/div[4]/div/div[2]/div/div[2]/ul')

# Extract "mythic" heroes
mythic_heroes = extract_heroes(mythic_ul_element)

# Click on the "Mythical Glory+" button to switch to another ul
mythical_glory_button = driver.find_element(By.XPATH, '/html/body/div[2]/div/div[4]/div/div[1]/div[2]/ul/li[3]')
mythical_glory_button.click()

# Check if "no more data" message exists
no_more_data_message_xpath = '/html/body/div[2]/div/div[4]/div/div[2]/div/div[2]/p[contains(text(), "no more data")]'
is_no_more_data = False

try:
    wait.until(EC.presence_of_element_located((By.XPATH, no_more_data_message_xpath)))
    is_no_more_data = True
except NoSuchElementException:
    pass

# Extract "mythical glory" heroes if "no more data" message is not present
if not is_no_more_data:
    # Wait for the new ul to fully load
    wait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[2]/div/div[4]/div/div[2]/div/div[2]/ul')))

    # Find the ul_element for the new ul
    mythical_glory_ul_element = driver.find_element(By.XPATH, '/html/body/div[2]/div/div[4]/div/div[2]/div/div[2]/ul')

    # Extract "mythical glory" heroes
    mythical_glory_heroes = extract_heroes(mythical_glory_ul_element)
else:
    mythical_glory_heroes = {}

# Combine the data into a single JSON object
combined_data = []

for hero_name, all_data in all_heroes.items():
    mythic_data = mythic_heroes.get(hero_name, {})
    mythical_glory_data = mythical_glory_heroes.get(hero_name, {})
    
    # Check if "no more data" message is found, set use, win, and ban to "0"
    if is_no_more_data:
        mythical_glory_data = {'win': '0.00%', 'use': '0.00%', 'ban': '0.00%'}
    
    combined_data.append({
        "name": hero_name,
        "all": all_data,
        "mythic": mythic_data,
        "glory": mythical_glory_data
    })

# Insert or update the hero data in the MongoDB collection
for hero_data in combined_data:
    hero_name = hero_data['name']
    query = {'name': hero_name}
    update = {'$set': {'stats': {'all': hero_data['all'], 'mythic': hero_data['mythic'], 'glory': hero_data['glory']}}}
    collection.update_one(query, update)

    print(hero_name)

print("Hero stats updated in MongoDB")

# Close the browser
driver.quit()
