import React, { ReactNode, useEffect, useState } from 'react'

import Alert from 'react-bootstrap/Alert'

export interface AutoDismissAlertProps {
    variant: string,
    heading: string,
    message: string
}

function AutoDismissAlert({ variant, heading, message }: AutoDismissAlertProps) {
    // create `show` state. When this is false, the Alert will be hidden from the screen.
    const [show, setShow] = useState(true)
    // a timer that will stop showing the alert after 5 seconds
    // We store the timeoutId, incase we need to cancel the timer early (because the AutoDismissAlert was unmounted)
    const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null)
    console.log(timeoutId)


    useEffect(() => {
        // timer, that closes the alert after 5 seconds
        const id = setTimeout(() => setShow(false), 5000)
        // Keep track of the timeoutId
        setTimeoutId(id)

        // clean up the timer. run whenever the component is unmounted
        // and its also run before an effect is re-created
        return function cleanup() {
            if (timeoutId !== null) {
                clearTimeout(timeoutId)
            }
        }
    }, [])

    return (
        <Alert
            /* This is the color, make it the bootstrap passed down as a prop */
            variant={variant}
            /* This function sets the show state to false, whenever the x in the top right is clicked. */
            onClose={() => setShow(false)}
            /* This adds a close button to our alert */
            dismissible
            /* The show property will display the alert if true, and hide it if false. */
            show={show}
        >
            <div className='container' >
                <Alert.Heading>{heading}</Alert.Heading>
                <p className='alert-body'>{message}</p>
            </div>
        </Alert>
    )
}

export default AutoDismissAlert