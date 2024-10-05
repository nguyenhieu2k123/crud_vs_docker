import React from 'react';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
} from '@tanstack/react-table';
import Loading from '../Loading/Loading';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from 'react';
import {
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons"

import TableSearch from './TableSearch';


export default function CommonTable<T>({ columns, data, loading = false, selectSearchKeys, handleFetchData }: TableProps<T>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<>
			<TableSearch selectSearchKeys={selectSearchKeys} handleFetchData={handleFetchData} />
			<div className="table-container pt-0 p-6 shadow-lg rounded-lg bg-white border border-slate-500">
				<Table className="w-full">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="p-4 text-center uppercase font-semibold text-base tracking-wider cursor-pointer"
										onClick={header.column.getToggleSortingHandler()}
									>
										<div className="flex items-center justify-center text-sm md:text-base">
											{flexRender(header.column.columnDef.header, header.getContext())}
											<div className="ml-2">
												{header.column.getIsSorted() === 'asc' && <ChevronUpIcon className="w-4 h-2" />}
												{header.column.getIsSorted() === 'desc' && <ChevronDownIcon className="w-4 h-2" />}
												{!header.column.getIsSorted() && (
													<div className="flex flex-col">
														<ChevronUpIcon className="w-4 h-2" />
														<ChevronDownIcon className="w-4 h-2" />
													</div>
												)}
											</div>
										</div>


									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="p-12 text-center"
									style={{ height: '150px' }}
								>
									<Loading />
								</TableCell>
							</TableRow>
						) : (
							table.getRowModel().rows.map((row, index) => (
								<TableRow
									key={row.id}
									className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-200 transition duration-150 ease-in-out shadow-sm`}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="p-4 text-center border-b border-gray-300"
											style={{ height: '50px' }}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
