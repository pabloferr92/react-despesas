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
  const [despesas, getAllDespesas] = useDespesas({
    ano: ano,
    mes: mes,
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Categoria)</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Dia</TableCell>
            <TableCell align="center">Mês</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas?.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.descricao}</TableCell>
              <TableCell align="center">{row.categoria}</TableCell>
              <TableCell align="center">{row.valor}</TableCell>
              <TableCell align="center">{row.dia}</TableCell>
              <TableCell align="center">{row.mes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
