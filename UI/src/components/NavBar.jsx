import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { useSome } from '../utilities/MainContextProvider';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppNavbar() {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useSome();
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/inventory">
            Inventory
          </Button>

          {!isLoggedIn ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentUser('Visitor');
              }}
              to="/login"
            >
              Logout
            </Button>
          )}

          {!isLoggedIn && (
            <Button color="inherit" component={Link} to="/createuser">
              Create Account
            </Button>
          )}

          {isLoggedIn && (
            <Button color="inherit" component={Link} to="/adminInventory">
              My Inventory
            </Button>
          )}
          {isLoggedIn && (
            <Button color="inherit" component={Link} to="/createitem">
              Add Item
            </Button>
          )}
        </Typography>
        <Typography variant="subtitle1">{`Current user:  ${currentUser.username || 'Visitor'}`}</Typography>
      </Toolbar>
    </AppBar>
  );
}
