import React from "react";
import { 
Grid, 
Typography, 
Paper,
Container, 
Link
} from "@mui/material";

export default function Rules() {
    return (
        <Container sx={{maxWidth:'400px'}}>
            <Paper sx={{padding:'40px'}}>
                <Typography sx={{ fontWeight: "bold" }} variant='h3'>
                    Our Rules
                </Typography>
                <Typography>
                    We welcome and support projects from a variety of categories: Art, Comics, Crafts, Dance, Design, Fashion, Film and Video, Food, Games, Journalism, Music, Photography, Publishing, Technology, and Theater. Here are five rules every JumpStarter project must follow.
                </Typography>
                <Typography sx={{ fontWeight: "bold", paddingTop: "20px" }} variant='h6'>
                    Projects must create something to share with others.
                </Typography>
                <Typography>
                JumpStarter can be used to create all sorts of things: art and gadgets, events and spaces, ideas and experiences. But every project needs a plan for creating something and sharing it with the world. At some point, the creator should be able to say: “It is finished. Here is what we created. Enjoy!”
                </Typography>
                <Typography sx={{ fontWeight: "bold", paddingTop: "20px" }} variant='h6'>
                    Projects and backer statistics must be honest and clearly presented.
                </Typography>
                <Typography>
                Our community is built on trust and communication. Projects can not mislead people or misrepresent facts. Creators should be candid about what they plan to accomplish and how they plan to do it. When a project involves manufacturing and distributing something complex, like a gadget, we require projects to show backers a prototype of what they are making, and we prohibit the use of misleading imagery. Creators should not misrepresent or artificially inflate the number of backers or amounts pledged to their projects.
                </Typography>
                <Typography sx={{ fontWeight: "bold", paddingTop: "20px" }} variant='h6'>
                Projects can not fundraise for charity.
                </Typography>
                <Typography>
                While nonprofits are welcome to launch projects on JumpStarter, projects can not promise to raise funds to donate to a charity or cause. Funds raised on JumpStarter must go towards facilitating the project outlined by the creator on the project page.
                </Typography>
                <Typography sx={{ fontWeight: "bold", paddingTop: "20px" }} variant='h6'>
                Projects can't offer equity.
                </Typography>
                <Typography>
                Investment is not permitted on JumpStarter. Projects can't offer incentives like equity, revenue sharing, or investment opportunities.
                </Typography>
                <Typography sx={{ fontWeight: "bold", paddingTop: "20px" }} variant='h6'>
                Projects can't involve prohibited items.
                </Typography>
                <Typography>
                We do not allow any of these things.
                </Typography>

            </Paper>
        </Container>
    )

}
