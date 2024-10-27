/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function DropdownCategory({ value, onChange }) {
  const categoryData = [
    { id: 1, title: "cactus" },
    { id: 2, title: "succulent" },
    { id: 3, title: "plants" },
    { id: 4, title: "pots" },
    { id: 5, title: "tools" },
    { id: 6, title: "growing media" },
  ];

  return (
    <Select
      onValueChange={(selectedValue) => {
        const selectedCategory = categoryData.find(
          (item) => item.title === selectedValue
        );
        if (selectedCategory) {
          onChange(selectedCategory.id);
        }
      }}
      value={categoryData.find((item) => item.id === value)?.title || ""}
    >
      <SelectTrigger>
        <SelectValue placeholder='Select a Category' />
      </SelectTrigger>
      <SelectContent>
        {categoryData.map((item) => (
          <SelectItem value={item.title} key={item.id}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
