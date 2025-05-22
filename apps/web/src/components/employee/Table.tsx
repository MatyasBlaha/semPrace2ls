'use client'

import {useEmployeeControllerGetByOwnerId} from "../../../hooks/api/generated";
import {useLocale} from "@/hooks/useLocale";
import {useMemo} from "react";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {EmployeeValues} from "@/types/employee/employee";
import {Box, Flex, Link, Spinner, Table, TableBody, TableCell, TableHeader, TableRow, Text} from "@chakra-ui/react";

export default function EmployeeTable({ownerId}: { ownerId: string }) {
    const {data: employees, isLoading, error} = useEmployeeControllerGetByOwnerId(ownerId)
    const locale = useLocale();

    const data = useMemo(() => employees ?? [], [employees]);
    console.log(data)
    const columns = useMemo<ColumnDef<EmployeeValues>[]>(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: info => info.getValue<string>(),
        },
        {
            accessorKey: 'phoneNumber',
            header: 'Phone',
            cell: info => info.getValue<string>(),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: info => info.getValue<string>(),
        },
        {
            id: 'branch',
            header: 'Branch',
            // Notice the uppercase “B” here
            accessorFn: row => row.Branch?.name ?? '',
            cell: info => {
                return(
                    <Link href={`/${locale}/owner/${ownerId}/branches/${info.row.original.id}`} color="blue.500" textDecoration="underline">
                        {info.row.original.name}
                    </Link>
                )
            }
        },
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    if (isLoading) return <Spinner/>;
    if (error) return <Text color="red.500">Error loading data</Text>;

    return (
        <Box overflowX="auto" maxWidth='700px'>
            <Flex direction='column'>
                <Flex justify="flex-end">
                    <Link href={`/${locale}/owner/${ownerId}/employees/new`}>
                        New Employee
                    </Link>
                </Flex>
                <Table.Root variant="simple" size="md">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableCell key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table.Root>
            </Flex>
        </Box>
    )
}