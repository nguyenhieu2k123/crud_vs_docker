type BaseTableSearchProps = {
	selectSearchKeys: OrderStatus[] | []
	handleFetchData: (searchQuery: searchQuery | null) => void;	
}
type TableProps<T> = BaseTableSearchProps & {
	columns: any;
	data: T[];
	loading?: boolean;
};

type searchQuery = {
	customerName: string | undefined,
	status: string[] | undefined,
	page: number | 1;
	per_page: number | 10;
} | null

type SelectItemType = {
	id: string;
	status: string[]
};
