import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  LegacyRef,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { GridReadyEvent, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { loadMeetingsData } from "@/api";
import Image from "next/image";
import FilterArea from "./FilterArea";

import { CsvExportModule } from "@ag-grid-community/csv-export";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

// Custom Cell Renderer (Display logos based on cell value)

const brandCellRenderer = (props: { value: any }) => {
  console.log("bjhsjdhsjdh::::::", props.value);
  return (
    <div className="flex  items-center">
      <Image
        src={props.value.logo}
        alt="brandlogo"
        width={500}
        height={500}
        style={{
          width: "22px",
          height: "22px",
          marginLeft: "5px",
          marginRight: "7px",
        }}
      />
      {/* <span>{props.value.name}</span> */}
      <p>{props.value.name}</p>
    </div>
  );
};

const memberCellRenderer = (props: { value: any[] }) => {
  console.log("member::::::", props.value);
  return (
    <div className="flex w-full justify-center items-center relative">
      {props.value.map((each, indx) => {
        return (
          <div
            key={indx}
            style={{
              width: "12px !important",
              position: "absolute",

              top: "2px",
              left: `${indx * 15}px`,
            }}
          >
            <Image
              src={each.photo}
              alt="brandlogo"
              width={500}
              height={500}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                margin: "8px 2px",
                padding: "auto",
              }}
              layout="fixed"
              objectFit="cover"
            />
          </div>
        );
      })}
      {/* <Image
        src={props.value.logo}
        alt="brandlogo"
        width={500}
        height={500}
        style={{
          width: "22px",
          height: "22px",
          marginLeft: "5px",
          marginRight: "7px",
        }}
      />
      
      <p>{props.value.name}</p> */}
    </div>
  );
};

const categoryCellRenderer = (props: { value: any[] }) => {
  console.log("category::::::", props.value);
  return (
    <div className="flex gap-1 w-full justify-items-center items-center h-full">
      {props.value.map((each, indx) => {
        return (
          <div
            key={indx}
            style={{
              borderWidth: "0.4px",
              borderColor: `${each.color}`,
              borderRadius: "12px",
              fontSize: "8px",
              lineHeight: "12px",
              padding: "0 5px",
              color: `${each.color}`,
            }}
          >
            {each.title}
          </div>
        );
      })}
    </div>
  );
};

const nextMeetingCellRenderer = (props: { value: any }) => {
  console.log("next::::::", props.value);
  return (
    <div className="flex gap-1 w-full justify-items-center items-center h-full">
      <div
        style={{
          borderWidth: "0.4px",
          borderColor: `${props.value.color}`,
          borderRadius: "4px",
          fontSize: "9px",
          lineHeight: "12px",
          padding: "0 5px",
          color: `${props.value.color}`,
        }}
      >
        {props.value.title}
      </div>
    </div>
  );
};

const tagCellRenderer = (props: { value: any[] }) => {
  console.log("tags::::::", props.value);
  return (
    <div className="flex gap-1 w-full justify-items-center items-center h-full">
      {props.value.map((each, indx) => {
        return (
          <div
            key={indx}
            style={{
              borderWidth: "0.4px",
              borderColor: `#6b7280`,
              borderRadius: "12px",
              fontSize: "10px",
              lineHeight: "15px",
              padding: "0 5px",
              color: `#6b7280`,
            }}
          >
            #{each}
          </div>
        );
      })}
    </div>
  );
};

// Create new GridExample component
const GridItems = () => {
  const gridRef = useRef<any>();

  const [noOfSelectedRows, setNoOfSelectedRows] = useState(0);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<any[]>([]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    {
      field: "brand",
      flex: 1.5,
      minWidth: 150,
      checkboxSelection: true,
      cellRenderer: brandCellRenderer,
    },

    {
      field: "description",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "members",
      flex: 1.5,
      minWidth: 120,
      cellRenderer: memberCellRenderer,
    },
    {
      field: "categories",
      flex: 1,
      minWidth: 100,
      cellRenderer: categoryCellRenderer,
    },
    {
      field: "tags",
      flex: 1,
      minWidth: 100,
      cellRenderer: tagCellRenderer,
    },
    {
      field: "nextmeeting",
      flex: 1,
      minWidth: 100,

      cellRenderer: nextMeetingCellRenderer,
    },
  ]);

  // Fetch data & update rowData state
  useEffect(() => {
    const meetingsRes = loadMeetingsData();
    console.log("meetings data", meetingsRes);
    setRowData(meetingsRes);
  }, []);

  const onClickToDeselect = useCallback(() => {
    // Use the gridRef to access the api
    // gridRef.current?.api.deselectAll();
    const sel = gridRef.current?.api.getSelectedRows();

    console.log("hereere::", sel); //exportDataAsCsv
  }, []);

  const rowSelected = () => {
    console.log("Row Selectedddd");

    const total = gridRef.current?.api.getSelectedRows();
    const glength = total.length;
    console.log("length", glength);
    setNoOfSelectedRows(glength);
  };

  const onBtnExport = useCallback(() => {
    console.log("fgghfgh");
    const sel = gridRef.current?.api.getSelectedRows();

    console.log("hereere::", sel);

    gridRef.current?.api.exportDataAsCsv();
  }, []);

  const onBtnUpdate = useCallback(() => {
    console.log("qqqqq");
    const sel = gridRef.current?.api.getSelectedRows();

    console.log("hereere::", sel);

    (document.querySelector("#csvResult") as any).value =
      gridRef.current!.api.getDataAsCsv();
  }, []);

  //   // Apply settings across all columns
  //   const defaultColDef = useMemo(() => ({
  //     filter: true,
  //     editable: true,
  //   }));

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="h-full ">
      <div
        className=" w-full h-10 flex justify-between px-2 items-center bg-zinc-50 font-semibold border-zinc-200 border-t-2"
        style={{
          marginTop: "5px",

          fontSize: "8px",
        }}
      >
        <div className="flex  flex-col sm:flex-row">
          <div className="flex w-20 h-6 items-center rounded-xl px-1 border mr-1">
            <Image
              src="/brands/category.svg"
              alt="down"
              width={500}
              height={500}
              style={{
                width: "14px",
                height: "14px",
                marginLeft: "1px",
                marginRight: "2px",
              }}
            />
            <p style={{ paddingTop: "2px" }}>All brands</p>
            <Image
              src="/downsvgrepo.svg"
              alt="down"
              width={500}
              height={500}
              style={{
                width: "12px",
                height: "12px",
                marginLeft: "2px",
              }}
            />
          </div>
          <div className="hidden sm:flex sm:flex-row">
            <FilterArea />
          </div>
        </div>

        <div className="flex">
          <div className="flex w-16 h-6 items-center rounded-xl px-1 border text-zinc-500">
            <Image
              src="/add-square.svg"
              alt="down"
              width={500}
              height={500}
              style={{
                width: "12px",
                height: "12px",
                marginRight: "2px",
              }}
            />
            <p style={{ paddingTop: "2px" }}>Meeting</p>
          </div>
          <div
            className="flex w-20 h-6 items-center rounded-xl px-1 border ml-1"
            onClick={onBtnExport}
            style={{ cursor: "pointer" }}
          >
            <Image
              src="/export.svg"
              alt="down"
              width={500}
              height={500}
              style={{
                width: "10px",
                height: "10px",
                marginRight: "1px",
              }}
            />
            <p style={{ paddingTop: "2px" }}>Export CSV</p>
          </div>
        </div>
      </div>

      <div
        className=" w-full h-10 flex sm:hidden justify-between px-2 items-center bg-zinc-50 font-semibold border-zinc-200 border-t-2"
        style={{
          marginTop: "5px",

          fontSize: "8px",
        }}
      >
        {/* Filter Tabs */}
        <FilterArea />
      </div>

      <div
        className={"ag-theme-quartz"}
        style={{ width: "100%", height: "560px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          // defaultColDef={defaultColDef}
          // pagination={true}
          rowSelection="multiple"
          // onSelectionChanged={(event) => console.log("Row Selected!")}
          // onCellValueChanged={(event) =>
          //   console.log(`New Cell Value: ${event.value}`)
          // }
          // onGridReady={onGridReady}
          onRowSelected={rowSelected}
        />
      </div>

      <div>
        <div
          className="w-full sm:w-80 h-10 flex px-4 items-center justify-around bg-zinc-50  rounded-2xl font-semibold border-slate-200 border-2"
          style={{
            margin: "auto",
            marginTop: "5px",
            marginBottom: "10px",
            // boxShadow: "12px 10px 26px -5px rgb(0 0 0 / 0.4)",
            fontSize: "10px",
          }}
        >
          <div className="flex w-12 sm:w-16 h-6 items-center mr-4">
            {/* <h2 onClick={() => onClickToDeselect()}>gbjhsd</h2> */}
            <div className="flex px-1 py-0 mr-1 bg-zinc-950 rounded items-center justify-center">
              <p className=" text-slate-50 ">{noOfSelectedRows}</p>
            </div>
            <p style={{ paddingTop: "2px" }}>selected</p>
          </div>
          <div className="flex w-16 h-6 items-center justify-center rounded-xl px-1 border mr-2">
            <Image
              src="/archive-down.svg"
              alt="deleteIcon"
              width={500}
              height={500}
              style={{
                width: "14px",
                height: "14px",
                marginRight: "1px",
              }}
            />
            <p
              // className="hidden sm:block"
              style={{ paddingTop: "2px" }}
            >
              Archive
            </p>
          </div>
          <div className="flex w-16 h-6 items-center justify-center text-rose-600 rounded-xl px-1 border p-auto mr-1">
            <Image
              src="/delete.svg"
              alt="deleteIcon"
              width={500}
              height={500}
              style={{
                width: "14px",
                height: "14px",
                marginRight: "1px",
              }}
            />
            <p
              // className="hidden sm:block"
              style={{ paddingTop: "2px" }}
            >
              Delete
            </p>
          </div>
          <div className="flex w-16 h-6 items-center rounded-xl px-2 border">
            <p style={{ paddingTop: "2px" }}>More</p>
            <Image
              src="/downsvgrepo.svg"
              alt="deleteIcon"
              width={500}
              height={500}
              style={{
                width: "14px",
                height: "14px",
                marginLeft: "4px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Render GridExample
// const root = createRoot(document.getElementById("root"));
// root.render(<GridExample />);
export default GridItems;
