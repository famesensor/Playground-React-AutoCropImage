import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CropTwoToneIcon from '@material-ui/icons/CropTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        display: 'none'
    }
}));

function App() {
    const classes = useStyles();
    let PhotoInput = '';
    const [imageOld, setImageOld] = useState(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVNNdzLTKeZuRHl9yGPRQXVpwgyV2-rbJWpf8TI-E6S-VEwJZ9&usqp=CAU'
    );
    const [imageNew, setImageNew] = useState(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVNNdzLTKeZuRHl9yGPRQXVpwgyV2-rbJWpf8TI-E6S-VEwJZ9&usqp=CAU'
    );

    const handleClickUpload = (e) => {
        PhotoInput.click();
    };

    const onImageChange = (e) => {
        const files = e.target.files[0];
        if (files) {
            setImageOld(URL.createObjectURL(files));
            onCropImage(files);
        }
    };

    const onCropImage = (file) => {
        let filerender = new FileReader();
        filerender.readAsDataURL(file);

        filerender.onload = () => {
            let img = new Image();
            img.src = filerender.result;

            img.onload = () => {
                // console.log('Original Width : ' + img.width + ' Pixel');
                // console.log('Original Height : ' + img.height + ' Pixel');

                const inputWidth = img.naturalWidth;
                const inputHeight = img.naturalHeight;
                const aspectRatio = 1;

                const inputImageAspectRatio = inputWidth / inputHeight;

                let outputWidth = inputWidth;
                let outputHeight = inputHeight;

                if (inputWidth <= 1000 && inputHeight <= 1000) {
                    if (inputImageAspectRatio > aspectRatio) {
                        outputWidth = inputHeight * aspectRatio;
                    } else if (inputImageAspectRatio < aspectRatio) {
                        outputHeight = inputWidth / aspectRatio;
                    }
                } else if (inputWidth <= 1000) {
                    if (inputImageAspectRatio > aspectRatio) {
                        outputWidth = inputHeight * aspectRatio;
                    } else if (inputImageAspectRatio < aspectRatio) {
                        outputHeight = inputWidth / aspectRatio;
                    }
                } else if (inputHeight <= 1000) {
                    if (inputImageAspectRatio > aspectRatio) {
                        outputWidth = inputHeight * aspectRatio;
                    } else if (inputImageAspectRatio < aspectRatio) {
                        outputHeight = inputWidth / aspectRatio;
                    }
                } else {
                    outputWidth = 1000;
                    outputHeight = 1000;
                }

                const outputX = (outputWidth - inputWidth) * 0.5;
                const outputY = (outputHeight - inputHeight) * 0.5;

                const outputImage = document.createElement('canvas');

                outputImage.width = outputWidth;
                outputImage.height = outputHeight;

                const ctx = outputImage.getContext('2d');
                ctx.drawImage(img, outputX, outputY);

                // document.getElementById('pic').src = outputImage.toDataURL(type);
                let result = outputImage.toDataURL(file.type);
                setImageNew(result);
                // console.log('Output Width : ' + outputWidth + ' Pixel');
                // console.log('Output Height : ' + outputHeight + ' Pixel');
            };
            img.onerror = (err) => {
                console.log(err);
            };
        };
        filerender.onerror = (err) => {
            console.log(err);
        };
    };

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Box display='flex' justifyContent='center'>
                    <CropTwoToneIcon fontSize='large' />
                    <Typography variant='h4' component='h4'>
                        Crop-Image to 1 : 1
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='flex-end'>
                    <input
                        accept='image/*'
                        className={classes.input}
                        id='icon-button-file'
                        type='file'
                        ref={(input) => {
                            PhotoInput = input;
                        }}
                        onChange={onImageChange}
                    />
                    <label htmlFor='contained-button-file'>
                        <Button
                            variant='contained'
                            color='primary'
                            component='span'
                            onClick={handleClickUpload}
                        >
                            Upload
                        </Button>
                    </label>
                    <Button
                        variant='contained'
                        color='primary'
                        component='span'
                        onClick={handleClickUpload}
                        style={{ marginLeft: '1%' }}
                        disabled
                    >
                        Download
                    </Button>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <Typography variant='h6' component='h4'>
                        Before
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <img src={imageOld} alt='' width='30%' height='auto' />
                </Box>
                <Box display='flex' justifyContent='center'>
                    <Typography variant='h6' component='h4'>
                        After
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <img src={imageNew} alt='' width='30%' height='auto' />
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default App;
