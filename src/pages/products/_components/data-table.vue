<script setup lang="ts" generic="TData, TValue">
import { ref } from 'vue';
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/vue-table';
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { valueUpdater } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import pagination from './pagination.vue';
import { Skeleton } from '@/components/ui/skeleton';

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
}>();

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
  },
});

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-4 items-center">
      <Input
        class="max-w-52"
        placeholder="Filter title..."
        :model-value="table.getColumn('title')?.getFilterValue() as string"
        @update:model-value="table.getColumn('title')?.setFilterValue($event)"
      />
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="props.loading">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell
                class="px-4"
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
              >
                <Skeleton class="w-full h-5" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <template v-if="table.getRowModel().rows?.length">
              <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() ? 'selected' : undefined"
              >
                <TableCell
                  class="px-4"
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
            </template>
            <template v-else>
              <TableRow>
                <TableCell :colspan="columns.length" class="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            </template>
          </template>
        </TableBody>
      </Table>
    </div>
    <pagination :table="table" />
  </div>
</template>
