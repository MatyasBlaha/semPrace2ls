// components/Navbar.tsx
import {
    Flex,
    Text,
    IconButton,
    useDisclosure,
    Box,
    Link,
    Stack, Button,
} from '@chakra-ui/react';
// import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import {MenuContent, MenuItem, MenuRoot, MenuTrigger} from "@ark-ui/react";
import {usePathname, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations("navbar.language")

    const handleLanguageChange = (locale: string) => {
        // Use window.location to get the current path with query params
        const currentPath = window.location.pathname + window.location.search;
        const newPath = currentPath.replace(/^\/(en|cz)/, `/${locale}`);
        router.push(newPath);
    };

    return (
        <Box bg='gray.100' px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                {/* Left side - Logo */}
                    <Link fontSize="xl" fontWeight="bold">
                        firma
                    </Link>

                {/* Desktop Right side */}
                <Flex alignItems="center" display={{base: 'none', md: 'flex'}}>
                    {/* Language Selector */}
                    <div>
                        <MenuRoot>
                            <MenuTrigger asChild>
                                <Button>
                                    Language
                                </Button>
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItem value='en' onClick={() => handleLanguageChange('cz')}>
                                    {t('czech')}
                                </MenuItem>
                                <MenuItem value='cz' onClick={() => handleLanguageChange('en')}>
                                    {t('english')}
                                </MenuItem>
                            </MenuContent>
                        </MenuRoot>
                    </div>
                    {/* Profile */}
                    <Flex alignItems="center">
                        {/*<Avatar size="sm" name="John Doe" src="" mr={2} />*/}
                        <Text>"name"</Text>
                    </Flex>
                </Flex>

                {/* Mobile menu button */}
                <IconButton
                    size="md"
                    // icon={<HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{md: 'none'}}
                    onClick={isOpen ? onClose : onOpen}
                />
            </Flex>

            {/* Mobile menu */}
            {isOpen && (
                <Box pb={4} display={{md: 'none'}}>
                    <Stack as="nav" spacing={4}>
                        <Flex alignItems="center">
                            {/*<Avatar size="sm" name="John Doe" src="" mr={2} />*/}
                            <Text>John Doe</Text>
                        </Flex>
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

export default Navbar;