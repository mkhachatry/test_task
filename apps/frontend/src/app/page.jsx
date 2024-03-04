'use client';

import React, { useCallback, useState } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import styles from './index.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdsList from '../pages/ads';

const Page = () => {
  const [loading, setLoading] = useState(false);

  const fetchAds = useCallback(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/ads?minPrice=1000000');
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Box alignContent="center">
        <h1>And here it starts...</h1>
        <Button onClick={fetchAds} variant='outlined' disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Send an API request'}
        </Button>
      </Box>
      <AdsList />
      <ToastContainer />
    </div>
  );
}

export default Page;