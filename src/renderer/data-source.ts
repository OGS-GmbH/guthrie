import type { DataSource, DataSourceConstant, DataSourceFn, Fns } from "./type";

function getDataSourceValue (
  dataSource: DataSource,
  fns: Fns 
) {
  switch (dataSource.type) {
    case "fn": {
      const fn = fns[dataSource.fn];

      return fn(
        ...(dataSource as DataSourceFn).args
      );
    }

    case "constant": {
      return (dataSource as DataSourceConstant).value;
    }
  }
}

export {
  getDataSourceValue
}
