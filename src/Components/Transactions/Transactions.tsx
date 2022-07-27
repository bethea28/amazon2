import React, {useState } from "react";
import { Grid, Button, Card, CardActions, CardContent, Paper, Typography, Input, Alert, AlertTitle, Dialog } from '@mui/material';
import {useForm, Controller, useFormContext} from 'react-hook-form'
import TransactionService from "../../services/transactionService";

interface PaymentInput{
    amount: number;
    firstName: string;
    lastName: string;
    creditNumber: string;
    expDate: string;
    userId?: string,
    projectId: string,
    date?: Date,
    status?: string
}

export default function TrasactionForm(){ //PM to be added: projectIdInput: string

    //CONTROL: pop up dialog    
    const {control, handleSubmit} = useForm<PaymentInput>();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
      };
    
    //CONTROL: on form submission states
    const [status, setStatus] = useState("IN_PROCESSING");
    const onSubmit = async (data: PaymentInput) => {
        
        //Open Pop up Dialog display Transaction Result
        setOpen(true);
        data.projectId = "hello";
        
        // Back End points to deal with: /data.date = new Date; data.status = 'COMPLETE';

        //CHECK: Request Status, setStatus
        try{
            const transaction = await TransactionService.createTransaction(data);
            setStatus('COMPLETE');
        }catch(error) {
            setStatus("ERROR");
        }
    }
    return (
        <Grid 
            container 
            spacing ={0}
            direction = "column"
            justifyContent='center'
            alignItems='center'
            >
            <Grid item xs>
                <Card sx={{ maxWidth: 300 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Enter a Pledge Amount
                        </Typography>
                        <Typography variant="body2" color="text.secondary"> Pledge Amount </Typography>
                        <Controller
                            render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />}
                            name="amount"
                            control={control}
                            defaultValue={0}
                        />
                        <Typography gutterBottom variant="h6" component="div">
                        Card Information
                        </Typography>
                        <Typography variant="body2" color="text.secondary"> First Name </Typography>
                        <Controller
                            render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)}/>}
                            name="firstName"
                            control={control}
                            defaultValue=""
                        />
                        <Typography variant="body2" color="text.secondary"> Last Name </Typography>
                        <Controller
                            render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />}
                            name="lastName"
                            control={control}
                            defaultValue=""
                        />
                        <Typography variant="body2" color="text.secondary"> Credit Card Number </Typography>
                        <Controller
                            render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />}
                            name="creditNumber"
                            control={control}
                            defaultValue=""
                        />
                        <Typography variant="body2" color="text.secondary"> Expiration Date </Typography>
                        <Controller
                            render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />}
                            name="expDate"
                            control={control}
                            defaultValue=""
                        />
                        </CardContent>
                        <CardActions>
                            <Button type="submit" size ="small" >Submit</Button>
                        </CardActions> 
                    </form>
                    <Dialog open = {open} onClose = {handleClose}>
                        {status == "COMPLETE" ? 
                            <Alert severity= "success"> 
                                <AlertTitle> Success
                                </AlertTitle><strong>Transaction was Successful!</strong></Alert> : 
                        status == "ERROR" ?
                            <Alert severity = "error">
                                <AlertTitle> Error </AlertTitle><strong> Transacation Failed! </strong>
                            </Alert> :
                            <Alert severity = "info">
                                <AlertTitle> Pending </AlertTitle><strong> Processing Issue </strong></Alert>}
                        </Dialog>
                </Card>
            </Grid>
        </Grid>
    )
}
