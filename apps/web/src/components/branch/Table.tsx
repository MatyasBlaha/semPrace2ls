'use client'

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';
import {
    Spinner,
    Box,
    Text,
    chakra,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody, Separator, Link
} from '@chakra-ui/react';

import {useBranchControllerGetBranchByOwnerId} from '../../../hooks/api/generated';
import {BranchValues} from '@/types/branch/branch';
import {useMemo} from 'react';
import {useLocale} from "@/hooks/useLocale";

export default function BranchTable({ownerId}: { ownerId: string }) {
    const {data: branches, isLoading, error} = useBranchControllerGetBranchByOwnerId(ownerId);
    const locale = useLocale();

    const data = useMemo(() => branches ?? [], [branches]);

    const columns = useMemo<ColumnDef<BranchValues>[]>(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'location',
            header: 'Location',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: info => {
                const type = info.getValue() as string;
                return type.charAt(0) + type.slice(1).toLowerCase();
            },
        },
        {
            accessorKey: 'owner.name',
            header: 'Owner Name',
            cell: info => info.row.original.owner?.name || 'N/A',
        },
        {
            accessorKey: 'link',
            header: 'Link',
            cell: info => {
                const id = info.row.original.id;
                return (
                    <Link href={`/${locale}/owner/${ownerId}/branches/${id}`} color="blue.500" textDecoration="underline">
                        View
                    </Link>
                );
            },
        },
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <Spinner/>;
    if (error) return <Text color="red.500">Error loading data</Text>;

    return (
        <Box overflowX="auto" maxWidth='700px'>
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
        </Box>
    );
}