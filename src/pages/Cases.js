import React from 'react';
import { Box, Container } from '@mui/material';
import Typography from "@mui/material/Typography";

export default function Cases() {
    return (
        <div>
            <Box sx={{ display: 'flex', mt: '30px' }}>
                <Container maxWidth="xl">
                    <Typography
                        sx={{ color: '#484848', fontSize: 26, paddingBottom: 5 }}
                        fontWeight="bold"
                        gutterBottom
                        variant="h4"
                    >
                        Cases
                    </Typography>
                </Container>
            </Box>
        </div>
    );
}
