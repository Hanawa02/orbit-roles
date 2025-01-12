<template>
  <div class="w-full">
    <div class="flex gap-2 items-center py-4">
      <Input
        class="max-w-52"
        :placeholder="members_selector_filter_placeholder()"
        :model-value="filterValue"
        @update:model-value="updateFilterValue"
      />
      <Button type="button" @click="removeSelectedUsers">
        {{ members_selector_remove_users_button() }}
      </Button>
    </div>
    <div class="rounded-md border">
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
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              {{ members_selector_no_users_added() }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          {{ members_selector_previous_button() }}
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          {{ members_selector_next_button() }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { valueUpdater } from "~/lib/utils";
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { h, ref, shallowRef } from "vue";
// import DropdownAction from "./DataTableDemoColumn.vue";

import type { RoleMember } from "~/composables/roles";
import { defineModel } from "vue";
import {
  members_selector_filter_placeholder,
  members_selector_next_button,
  members_selector_no_users_added,
  members_selector_previous_button,
  members_selector_remove_users_button,
  members_selector_select_all_members_aria_label,
  members_selector_select_row_member_aria_label,
  members_selector_table_user_name,
  members_selector_table_user_type,
} from "translations";
import type { Row, Table as TableType } from "@tanstack/vue-table";
import { useUsers } from "~/composables/usersConnections";

const { users, loadUsers } = useUsers();
// const { data: users } = await fetchUsers();

const members = defineModel<RoleMember[]>();

const data = computed<RoleMember[]>(() => members.value ?? []);

const columns: ColumnDef<RoleMember>[] = [
  {
    id: "select",
    header: ({ table }: { table: TableType<RoleMember> }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:checked": (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: members_selector_select_all_members_aria_label(),
      }),
    cell: ({ row }: { row: Row<RoleMember> }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: members_selector_select_row_member_aria_label(),
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [
          members_selector_table_user_name(),
          h(ArrowUpDown, { class: "ml-2 h-4 w-4" }),
        ]
      );
    },
    cell: ({ row }: { row: Row<RoleMember> }) => {
      return h("div", { class: "capitalize" }, row.original.displayName);
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [
          members_selector_table_user_type(),
          h(ArrowUpDown, { class: "ml-2 h-4 w-4" }),
        ]
      );
    },
    cell: ({ row }) => {
      return h(
        "div",
        { class: "capitalize" },
        memberTypeTranslation(row.original.type)
      );
    },
  },
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get expanded() {
      return expanded.value;
    },
  },
});

const filterValue = computed(
  () => table.getColumn("displayName")?.getFilterValue() as string
);

const updateFilterValue = (event: string | number) => {
  table.getColumn("displayName")?.setFilterValue(event);
};

const removeSelectedUsers = () => {
  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  members.value = members.value?.filter(
    (member) => !selectedIds.includes(member.id)
  );
};
</script>
