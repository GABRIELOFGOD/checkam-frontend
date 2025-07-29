'use client'

import * as React from 'react'
import {
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  // VisibilityState,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { IUser } from '@/models/user'
import { ALLUSERS } from '../utils/constants'
import { isError } from '@/lib/helper'
import { toast } from 'sonner'
import { useUser } from '@/providers/user-provider'
import { useRouter, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

// interface UserTableProps {
//   data: IUser[]
// }

export function UserTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [data, setData] = React.useState<IUser[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  
  const router = useRouter();
  const path = usePathname();

  const { isLoaded, user } = useUser();

  const fetchUsers = async () => {
    try {
      const req = await fetch(ALLUSERS, { next: { revalidate: 60*60 } });
      const res = await req.json();
      setData(res);
    } catch (error: unknown) {
      if (isError(error)) {
        toast.error(error.message);
        console.error("Login failed", error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (isLoaded && !user) {
      router.push(`/login?back=${path}`);
    // } else {
    //   if (isLoaded && user?.role !== "admin") {
    //     router.push("/");
      } else {
        fetchUsers();
      }
    // }
    
  }, [isLoaded]);

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'image',
      header: '',
      cell: ({ row }) => {
        const user = row.original
        return (
          <Avatar>
            <AvatarImage src={user.image || ''} alt={user.fname} />
            <AvatarFallback>{user.fname[0]}{user.lname[0]}</AvatarFallback>
          </Avatar>
        )
      },
    },
    {
      accessorKey: 'fname',
      header: 'First Name',
      cell: ({ row }) => row.original.fname,
    },
    {
      accessorKey: 'lname',
      header: 'Last Name',
      cell: ({ row }) => row.original.lname,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => row.original.email,
    },
    {
      accessorKey: 'emailVerified',
      header: 'Verified',
      cell: ({ row }) =>
        row.original.emailVerified ? (
          <Badge variant="secondary">Yes</Badge>
        ) : (
          <Badge variant="destructive">No</Badge>
        ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant={row.original.role === 'admin' ? 'default' : 'outline'}>
          {row.original.role || 'user'}
        </Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Filter by email..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter by first name..."
          value={(table.getColumn('fname')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('fname')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        {loading ? (
          <div className='w-full h-[200px] flex gap-3 justify-center items-center'>
            <Loader2 className="animate-spin my-auto" size={15} />
            <p className="font-semibold text-sm my-auto">Loading users</p>
          </div>
        ) : (<Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>)}
      </div>

      <div className="flex items-center justify-between space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
