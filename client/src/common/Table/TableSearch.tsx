
import { Input } from "@/components/ui/input";
import {  useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounce } from "@/helpers/helpers";


// type SelectItemType = {
// 	id: string;
// 	status: string;
// };


export default function TableSearch({
	selectSearchKeys,
	handleFetchData,
}: BaseTableSearchProps) {
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounce(searchText, 1000)
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	
	const handleChange = (data: string) => {
		setSearchText(data);
	};

	const handleCheckedChange = (checked: boolean, id: string) => {
		setSelectedItems((prev) =>
			checked ? [...prev, id] : prev.filter((item) => item !== id)
		);
	};

	useEffect(() => {
		handleFetchData({
			customerName: searchText,
			status: selectedItems,
			page: 1,
			per_page: 10
		});
	}, [selectedItems, debouncedSearchText]);

	return (
		<div className="flex flex-col gap-8 my-8">
			<div>
				<p className="mb-2">Filter by:</p>
				<div className="flex gap-8">
					<Input
						type="text"
						placeholder="Customer name"
						value={searchText}
						onChange={(e) => handleChange(e.target.value)}
					/>
				</div>
			</div>
			<div>
				<p className="mb-2">Status: </p>
				<div className="flex flex-col md:flex-row gap-4">
					{selectSearchKeys.map((item) => (
						<div key={item.id} className="flex items-center cursor-pointer">
							<Checkbox
								checked={selectedItems.includes(item.id)}
								id={item.id}
								onCheckedChange={(checked: boolean) => handleCheckedChange(checked, item.id)}
							/>
							<label htmlFor={item.id} className="ml-2 cursor-pointer">
								{item.status}
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
