import styled from "@emotion/styled";
import { TableCell, tableCellClasses, TableRow } from "@mui/material";

const formatDate = (s) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(s);
  return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#475e7b",
    color: "white",
    padding: "15px 10px",
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e8e8e8",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export { formatDate, StyledTableCell, StyledTableRow };
