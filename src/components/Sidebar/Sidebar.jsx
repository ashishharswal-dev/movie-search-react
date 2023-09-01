import React, { useEffect } from 'react';
import {
  Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import { useGetGenresQuery } from '../../services/TMDB';
import useStyles from './styles';
import gernreIcons from '../../assets/genres';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const blueLogo = 'https://fontmeme.com/permalink/230810/a0acbf3c625c924f89c2b12588d41b82.png';
const redLogo = 'https://fontmeme.com/permalink/230810/04ed4298bd07c7d66013274e22e41c91.png';

function Sidebar({ setmobileOpen }) {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const classes = useStyles();
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  // console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    setmobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="MovieLand logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img src={gernreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Generes</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )
          : data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img src={gernreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
      </List>
    </>

  );
}

export default Sidebar;
