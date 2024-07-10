import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onSearch: (searchQuery: string) => void;
  deleteSelection: string[]; //feature flag @ nitesh
  setSelection: (selection: string[]) => void; // feature flag @nitesh
}

export default function TemporaryDrawer({
  onSearch,
  deleteSelection,
  setSelection,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleClose = () => () => {
    setSelection([]);
  };

  const triggerDelete = () => async () => {
    try {
      console.log('Delete feature not required as of now');
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  };

  const handleLogout = () => async () => {
    try {
      sessionStorage.removeItem('authToken');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'Mighty Bot', url: 'https://www.mightybot.ai/' },
          { text: 'Feature', url: 'https://www.mightybot.ai/#features' },
          { text: 'Solution', url: 'https://www.mightybot.ai/#solution' },
          { text: 'Pricing', url: 'https://www.mightybot.ai/pricing' },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => window.open(item.url, '_blank')}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'Terms', url: 'https://www.mightybot.ai/terms' },
          { text: 'Privacy', url: 'https://www.mightybot.ai/privacy' },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => window.open(item.url, '_blank')}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <MenuIcon
        onClick={toggleDrawer(true)}
        style={{
          marginLeft: '1vw',
          marginTop: '2vh',
          cursor: 'pointer',
        }}
        onMouseEnter={(e: React.MouseEvent<SVGElement>) => {
          (e.target as SVGElement).style.cursor = 'pointer';
        }}
        onMouseLeave={(e: React.MouseEvent<SVGElement>) => {
          (e.target as SVGElement).style.cursor = 'default';
        }}
      />
      {deleteSelection.length ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '50vw',
            marginTop: '2vh',
          }}
        >
          <CloseIcon
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e: React.MouseEvent<SVGElement>) => {
              (e.target as SVGElement).style.cursor = 'pointer';
            }}
            onMouseLeave={(e: React.MouseEvent<SVGElement>) => {
              (e.target as SVGElement).style.cursor = 'default';
            }}
            onClick={handleClose()}
          ></CloseIcon>
          <span style={{ marginLeft: '5px' }}>
            {deleteSelection.length} Selected
          </span>
          <Button
            variant="outlined"
            color="error"
            style={{ marginLeft: '10px' }}
            onClick={triggerDelete()}
          >
            Delete
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            hiddenLabel
            placeholder="Search"
            id="outlined-basic"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              ml: 1,
              borderRadius: 2,
              width: '40vw',
              marginTop: '2vh',
            }}
          />
          <Button
            variant="contained"
            onClick={() => onSearch(searchQuery)}
            sx={{ marginLeft: '10px', marginTop: '12px' }}
          >
            <SearchIcon />
          </Button>
        </div>
      )}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Button style={{ marginRight: '1vw' }} onClick={handleLogout()}>
        Logout
      </Button>
    </div>
  );
}
