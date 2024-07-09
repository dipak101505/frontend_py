'use client';
import TemporaryDrawer from '@/component/responsiveDrawer';
import VirtulizedList from '@/component/virtualizedList';
import * as React from 'react';

import { useState, useEffect } from 'react';

interface FirestoreData {
  index: number;
  title: string;
  text: string;
  url: string;
}

interface SearchResult {
  result: {
    id: number;
    matched_sentence: string;
    rank: number;
    title: string;
    url: string;
  };
}

const page = () => {
  const [input, setInput] = React.useState('');
  const [firestoreData, setFirestoreData] = React.useState<FirestoreData[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const currentUser = React.useRef('');

  React.useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
      window.location.href = '/login';
    } else {
      currentUser.current = authToken;
    }
  }, []);

  const handleSearch = (searchQuery: string) => {
    setInput(searchQuery);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, [input]);

  // Simulate fetching data from a local data source
  const fetchData = async () => {
    // Replace this with your actual data fetching logic
    try {
      const response = await fetch(
        `http://35.208.215.114:8005/search/${input}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: { data: SearchResult[]; message: string } =
        await response.json();
      console.log(data.data);

      if (data.data) {
        // Transform the API response to the FirestoreData format
        const transformedData = data.data.map((item, index) => ({
          index,
          title: item.result.title,
          text: item.result.matched_sentence,
          url: item.result.url, // You'll need to add the URL logic here
        }));
        setFirestoreData(transformedData);
      } else {
        console.error('Error fetching data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <TemporaryDrawer
        onSearch={handleSearch}
        deleteSelection={selected}
        setSelection={setSelected}
        currentUser={currentUser.current}
      />
      <VirtulizedList
        data={firestoreData}
        selectItem={setSelected}
        removeSelection={selected}
      />
    </>
  );
};

export default page;
