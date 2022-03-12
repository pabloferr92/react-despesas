import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DespesasInterface } from "../models/DespesasIntercace";
import { DespesasService } from "../services/DespesasService";
import { useParams } from "react-router-dom";
import { calculaTotal } from "../helpers/DespesaHelper";
import { helperSetTotalDespesas } from "../helpers/Helper";
import { useDespesas } from "../hooks/useDespesas";

export default function TableComponent() {
  const despesaService = new DespesasService();

  const { mes } = useParams();
  const { ano } = useParams();
  const [despesas, getAllDespesas, categorias] = useDespesas({
    ano: ano,
    mes: mes,
  });

  console.log("Categorias " + JSON.stringify(categorias));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Categoria</TableCell>
            <TableCell align="center">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias?.map((row) => (
            <TableRow key={row.categoria}>
              <TableCell align="center">{row.categoria}</TableCell>
              <TableCell align="center">
                {"R$ " + row.valor.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
