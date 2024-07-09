'use client';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useRef, useEffect, useState } from 'react';

interface FirestoreData {
  index: number;
  title: string;
  text: string;
  url: string;
}

interface User {
  email: string;
  feature_delete: boolean;
}

interface Props {
  data: FirestoreData[];
  selectItem: (selected: string[]) => void;
  removeSelection: string[];
}

const VirtulizedList: React.FC<Props> = ({
  data,
  selectItem,
  removeSelection,
}) => {
  const checked = React.useRef<string[]>([]);
  const [showSecondaryAction, setShowSecondaryAction] = React.useState(false);

  // Simulate user authentication
  const userLoggedIn = true; // Replace with your actual authentication logic
  const currentUser: User = {
    email: 'test@example.com', // Replace with actual user email
    feature_delete: false, // Replace with actual feature_delete value
  };

  React.useEffect(() => {
    if (userLoggedIn && currentUser) {
      // Simulate fetching user data from a local data source
      // Replace this with your actual data fetching logic
      const mockUserData: User = {
        email: currentUser.email,
        feature_delete: currentUser.feature_delete,
      };

      setShowSecondaryAction(mockUserData.feature_delete);
    } else {
      console.log('No user is signed in.');
    }
  }, []);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.current.indexOf(value);
    const newChecked = [...checked.current];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    checked.current = newChecked;
    selectItem(newChecked);
  };

  return (
    <List
      dense
      sx={{
        width: '100%',
        maxWidth: '50vw',
        bgcolor: 'background.paper',
        marginLeft: '22vw',
        marginTop: '5vh',
      }}
    >
      {data.map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem
            key={index}
            secondaryAction={
              showSecondaryAction ? (
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value.index.toString())}
                  checked={
                    checked.current.indexOf(value.index.toString()) !== -1
                  }
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              ) : null
            }
            disablePadding
          >
            <ListItemButton
              onClick={() => window.open(`${value.url}`, '_blank')}
            >
              <ListItemText
                id={labelId}
                primary={`${value.title}`}
                secondary={
                  <span>
                    <div dangerouslySetInnerHTML={{ __html: value.text }} />
                  </span>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default VirtulizedList;
