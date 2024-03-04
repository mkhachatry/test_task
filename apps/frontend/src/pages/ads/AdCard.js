import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import styles from './AdCard.module.scss';
import Link from 'next/link';

const AdCard = ({ ad }) => {
  return (
    <Card className={styles.card}>
      <Link href={`/ads/${ad.id}`} className={styles.link}>
        <CardMedia
          className={styles.media}
          component="img"
          image={ad.images[0].thumbnail}
          alt={ad.title}
        />
      </Link>
        <CardContent>
          <Typography className={styles.title} variant="h5">
            <Link href={`/ads/${ad.id}`} className={styles.link}>
              {ad.title}
            </Link>
          </Typography>
          <div className={styles.details}>
            <Typography variant="body2">{ad.city}</Typography>
            <Typography variant="body2">{ad.price}</Typography>
          </div>
        </CardContent>
      
      <Button variant="contained" color="primary">Like</Button>
    </Card>
  );
};

export default AdCard;