import { GradiantCard } from "@/components/shared/gradiant-card";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

import { useState } from "react";
import { Search } from "lucide-react";

const PostSearchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [postFilter, setPostFilter] = useState("");
  return <div>post-search-bar</div>;
};

export default PostSearchbar;
