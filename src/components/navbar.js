import React, { memo } from "react";
import { Text, Box, Image, Icon } from "goods-core";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "goods-ui";

const BackButton = ({ title, withBackButton = true }) => {
  const history = useHistory();

  const onClickBack = () => history.goBack();
  return (
    <Box fDir="row" fAlign="center">
      {withBackButton && (
        <Icon name="arrow" c="black30" onClick={onClickBack} />
      )}
      <Text pr="xxs">{title}</Text>
    </Box>
  );
};

const Navbar = ({ title = "", withBackButton = true }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const goToMyPokemonPage = () => {
    history.push(`/my-pokemons`);
  };

  return (
    <Box
      w
      maxW="544px"
      bg="white10"
      radius="0px"
      fJustify="space-between"
      fAlign="center"
      fDir="row"
      p="s"
      h="64px"
      posi="sticky"
      z="100"
      top="0"
      left="0"
    >
      <BackButton title={title} withBackButton={withBackButton} />
      {pathname === "/" && (
        <Button as="a" w="144px" onClick={goToMyPokemonPage}>
          My Pokemons
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
