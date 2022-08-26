

export interface SettingsT {
    autoPlay: boolean,
    animation: "fade" | "slide",
    indicators: boolean,
    duration: number,
    navButtonsAlwaysVisible: boolean,
    navButtonsAlwaysInvisible: boolean,
    fullHeightHover: boolean,
    cycleNavigation: boolean,
    swipe: boolean,
    [key: string]: any
}

export const DefaultSettingsT: SettingsT = {
    autoPlay: true,
    animation: "slide",
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: true,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true
}

interface SettingsProps {
    settings: SettingsT,
    setSettings: Function
}


const Settings = ({ settings, setSettings }: SettingsProps) => {

    /** Default function for Switches */
    const toggler = (event: any) => {
        setSettings({
            ...settings,
            [event.target.value]: !settings[event.target.value]
        })
    }

    /** Default function for Radio Groups */
    const radio = (event: any) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.value
        })
    }

    /** Default function for Sliders */
    const slider = (event: any, value: any) => {
        console.log(event);
        console.log(value);
        setSettings({
            ...settings,
            [event.target.name]: value
        })
    }
}

export default Settings;