import {
  Box,
  Container,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import "./despesas.css";

export default function Despesas() {
  const navigate = useNavigate();

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  function handleNavigateMonth(event: SelectChangeEvent) {
    setMonth(event.target.value);
  }

  function handleNavigateYear(event: SelectChangeEvent) {
    setYear(event.target.value);
  }

  useEffect(() => {
    if (year && month) {
      navigate(`/despesas/${month}/${year}`);
    }

    return () => {};
  }, [year, month, navigate]);

  return (
    <>
      <Container>
        <Box display="flex" marginBottom={"15px"} alignItems="center">
          <Box display="flex" alignItems="center" flex="1" padding={"10px"}>
            <InputLabel id="select-year-label">Year</InputLabel>
            <Select
              onChange={handleNavigateYear}
              id="yearSelect"
              labelId="select-year-label"
              label="Year"
              value={year}
              className="custom-select"
            >
              <MenuItem value={"2021"}>2021</MenuItem>
            </Select>

            <InputLabel id="select-year-label">Month</InputLabel>
            <Select
              id="monthSelect"
              className="custom-select"
              value={month}
              onChange={handleNavigateMonth}
            >
              <MenuItem value={"01"}>Janeiro</MenuItem>
              <MenuItem value={"02"}>Fevereiro</MenuItem>
              <MenuItem value={"03"}>Março</MenuItem>
              <MenuItem value={"04"}>Abril</MenuItem>
              <MenuItem value={"05"}>Maio</MenuItem>
              <MenuItem value={"06"}>Junho</MenuItem>
              <MenuItem value={"07"}>Juhlo</MenuItem>
              <MenuItem value={"08"}>Agosto</MenuItem>
              <MenuItem value={"09"}>Setembro</MenuItem>
              <MenuItem value={"10"}>Outubro</MenuItem>
              <MenuItem value={"11"}>Novembro</MenuItem>
              <MenuItem value={"12"}>Dezembro</MenuItem>
            </Select>
          </Box>
          <Box>
            <span id="despesasTotal">Despesas total</span>
          </Box>
        </Box>
        <Box>
          <TableComponent></TableComponent>
        </Box>
      </Container>
    </>
  );
}
