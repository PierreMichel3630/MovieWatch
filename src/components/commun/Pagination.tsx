import { Pagination, Paper } from "@mui/material";
import { percent } from "csx";

interface Props {
  totalPage: number;
  page: number;
  onChange: (page: number) => void;
}

const MAXPAGE = 500;

export const FixedBottomPagination = ({ totalPage, page, onChange }: Props) => {
  return (
    <Paper
      sx={{
        position: "sticky",
        top: "0px",
        display: "flex",
        justifyContent: "center",
        padding: 1,
        marginTop: 2,
        alignSelf: "start",
        width: percent(100),
      }}
      elevation={3}
    >
      <Pagination
        count={totalPage > MAXPAGE ? MAXPAGE : totalPage}
        page={page}
        defaultPage={1}
        boundaryCount={2}
        onChange={(event, page) => onChange(page)}
        showFirstButton
        showLastButton
      />
    </Paper>
  );
};
