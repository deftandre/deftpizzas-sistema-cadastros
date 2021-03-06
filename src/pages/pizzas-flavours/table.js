import React from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import {
    Grid,
    List,
    ListItem as MaterialListItem,
    ListItemText,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import {
    TableButton,
    TableContainer,
    TableTitle,
    TableTitleContainer,
    Th,
    THead,
} from "ui";
import { PIZZAS_FLAVOURS, NEW, EDIT } from "routes";

import { useCollection } from "hooks";

const TablePizzasFlavours = () => {
    const newFlavourPath = useRouteMatch(`${PIZZAS_FLAVOURS}${NEW}`);
    const { data: pizzasFlavours, remove } = useCollection("pizzasFlavours");
    const { data: pizzasSizes } = useCollection("pizzasSizes");

    return (
        <TableContainer>
            <TableTitleContainer>
                <Grid item>
                    <TableTitle>Sabores cadastrados</TableTitle>
                </Grid>
                <Grid item>
                    <TableButton
                        color="primary"
                        startIcon={<Add />}
                        component={Link}
                        to={`${PIZZAS_FLAVOURS}${NEW}`}
                        disabled={!!newFlavourPath}
                    >
                        Adicionar novo sabor
                    </TableButton>
                </Grid>
            </TableTitleContainer>
            <Table>
                <THead>
                    <TableRow>
                        <Th>Foto</Th>
                        <Th>Nome</Th>
                        <Th>Valores</Th>
                        <Th></Th>
                    </TableRow>
                </THead>
                <TableBody>
                    {pizzasFlavours?.length === 0 && (
                        <TableRow>
                            <TableCell>
                                Não existem sabores de pizzas cadastrados.
                            </TableCell>
                        </TableRow>
                    )}
                    {pizzasFlavours?.map((pizza) => (
                        <TableRow key={pizza.id}>
                            <TableCell>
                                <img
                                    src={pizza.image}
                                    alt={pizza.name}
                                    width="50"
                                />
                            </TableCell>
                            <TableCell>{pizza.name}</TableCell>
                            <TableCell>
                                <List>
                                    {Object.entries(pizza.value)
                                        .sort(([, b], [, d]) => b - d)
                                        .map(([sizeId, value]) => {
                                            const sizeName = pizzasSizes?.find(
                                                (s) => s.id === sizeId
                                            )?.name;

                                            return (
                                                <ListItem
                                                    key={sizeId}
                                                    name={sizeName}
                                                    value={value}
                                                />
                                            );
                                        })}
                                </List>
                            </TableCell>
                            <TableCell>
                                <TableButton
                                    startIcon={<Edit />}
                                    component={Link}
                                    to={`${PIZZAS_FLAVOURS}${EDIT(pizza.id)}`}
                                >
                                    Editar
                                </TableButton>
                                <TableButton
                                    color="secondary"
                                    startIcon={<Delete />}
                                    onClick={() => remove(pizza.id)}
                                >
                                    Remover
                                </TableButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const ListItem = ({ name = "", value }) => (
    <MaterialListItem>
        <ListItemText>
            <strong>{name}</strong>: R$ {value}
        </ListItemText>
    </MaterialListItem>
);

ListItem.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number.isRequired,
};

export default TablePizzasFlavours;
