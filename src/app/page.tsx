'use client';
import TemporaryDrawer from '@/component/responsiveDrawer';
import VirtulizedList from '@/component/virtualizedList';
import * as React from 'react';

interface SupabaseData {
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

const Page = () => {
  const inputRef = React.useRef('');
  const [supabaseData, setSupabaseData] = React.useState<SupabaseData[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]); //additional feature flag requirement by Nitesh

  React.useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
      window.location.href = '/login';
    }
  }, []);

  const handleSearch = (searchQuery: string) => {
    inputRef.current = searchQuery;
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://35.208.215.114:8005/search/${inputRef.current}`,
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
        // Transforming the API response to the Data format
        const transformedData = data.data.map((item, index) => ({
          index,
          title: item.result.title,
          text: item.result.matched_sentence,
          url: item.result.url,
        }));
        setSupabaseData(transformedData);
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
      />
      <VirtulizedList
        data={supabaseData}
        selectItem={setSelected}
        removeSelection={selected}
      />
    </>
  );
};

export default Page;
