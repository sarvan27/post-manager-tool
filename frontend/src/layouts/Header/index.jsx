import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Post Manager Tool
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
