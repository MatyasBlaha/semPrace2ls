import {Box, Button, Flex, useBreakpointValue} from "@chakra-ui/react";
import Sidebar from "@/components/owner/dashboard/Sidebar";
import {ReactNode, useState} from "react";

export default function SidebarHolder({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });
return (
    <Flex>
        {isMobile && (
            <Button
                aria-label="Open menu"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                position="fixed"
                top='70px'
                right={4}
                zIndex="modal"
            />
        )}

        <Box
            position={{ base: "fixed", md: "relative" }}
            left={{ base: isSidebarOpen ? "0" : "-250px", md: "0" }}
            top={{ base: "0", md: "auto" }}
            h="100vh"
            w="250px"
            bg="gray.800"
            color="white"
            transition="left 0.3s ease"
            zIndex="overlay"
        >
            <Sidebar onMobileClose={() => setSidebarOpen(false)} />
        </Box>

        <Box
            flex="1"
            ml={{ md: "0px" }}
            pt={{ base: "70px", md: "0" }}
            px={4}
            minH="100vh"
            onClick={() => isMobile && setSidebarOpen(false)}
        >
            {children}
        </Box>
    </Flex>
)
}