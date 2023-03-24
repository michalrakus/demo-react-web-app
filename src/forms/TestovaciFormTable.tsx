import React, {useEffect, useState} from "react";
import {XUtils} from "@michalrakus/x-react-web-lib/XUtils";
import {DataTable, DataTableFilterMeta} from "primereact/datatable";
import {Column} from "primereact/column";
import {FindParam, ResultType} from "@michalrakus/x-react-web-lib/lib/serverApi/FindParam";
import {FindResult} from "@michalrakus/x-react-web-lib/lib/serverApi/FindResult";
import {FilterMatchMode} from "primereact/api";

export const TestovaciFormTable = (props: {}) => {

    const [value, setValue] = useState<FindResult>({rowList: [], totalRecords: 0});
    const [filters, setFilters] = useState<DataTableFilterMeta>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        loadData();
        initFilters();
    }, []);

    const loadData = () => {
        loadDataBase(
            {
                resultType: ResultType.AllRows,
                filters: {},
                multiSortMeta: [],
                entity: "Car",
                fields: []
        });
    }

    const loadDataBase = async (findParam: FindParam) => {
        //console.log("zavolany loadDataBase - startIndex = " + findParam.first + ", endIndex = " + ((findParam.first ?? 0) + (findParam.rows ?? 0)) + ", filters = " + JSON.stringify(findParam.filters) + ", multiSortMeta = " + JSON.stringify(findParam.multiSortMeta) + ", fields = " + JSON.stringify(findParam.fields));
        setLoading(true);
        const findResult = await findByFilter(findParam);
        setValue(findResult);
        setLoading(false);
        // odlozime si filter hodnoty pre pripadny export - deep cloning vyzera ze netreba
        //setFiltersAfterFiltering(filters);
    }

    const findByFilter = async (findParam: FindParam) : Promise<FindResult> => {

        // vysledok je typu FindResult
        const {rowList, totalRecords} : {rowList: any[], totalRecords: string} = await XUtils.fetchOne('lazyDataTableFindRows', findParam);
        return {rowList: rowList, totalRecords: parseInt(totalRecords)};
    }

    const initFilters = () => {
        // setFilters({
        //     vin: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        //     brand: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
        // });
        setFilters({
            vin: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            brand: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            year: { value: null, matchMode: FilterMatchMode.EQUALS },
            color: { value: null, matchMode: FilterMatchMode.EQUALS },
            price: { value: null, matchMode: FilterMatchMode.EQUALS },
            carBoolean: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
    };

    return (
        <div>
            <h1>Testovaci form table</h1>
            <div>
                <DataTable value={value.rowList} paginator showGridlines rows={20} loading={loading} dataKey="idCar"
                           filters={filters} style={{width: '1200px'}} scrollable filterDisplay="row">
                    <Column field="idCar" header="Id car" />
                    <Column field="vin" header="Vin" filter style={{width: '100px'}}/>
                    <Column field="brand" header="Brand" filter />
                    <Column field="year" header="Year" filter />
                    <Column field="color" header="Color" filter />
                    <Column field="price" header="Price" filter style={{width: '300px'}}  align="right"/>
                    <Column field="carBoolean" header="Car boolean" filter style={{width: '300px'}}  align="center"/>
                </DataTable>
            </div>
        </div>
    );
}
