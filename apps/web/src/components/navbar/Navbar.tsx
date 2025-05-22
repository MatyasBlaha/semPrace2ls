'use client'

import {
    Flex,
    Text,
    Box,
    Link,
    Stack, Button,
} from '@chakra-ui/react';
import {MenuContent, MenuItem, MenuRoot, MenuTrigger} from "@ark-ui/react";
import { useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {useAuth} from "@/hooks/useAuth";

const Navbar = () => {
    const {data: user} = useAuth()
    const router = useRouter()
    const t = useTranslations("navbar.language")

    const handleLanguageChange = (locale: string) => {
        const currentPath = window.location.pathname + window.location.search;
        const newPath = currentPath.replace(/^\/(en|cz)/, `/${locale}`);
        router.push(newPath);
    };

    return (
        <Box bg='gray.100' px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                    <Link fontSize="xl" fontWeight="bold">
                        firma
                    </Link>

                <Flex alignItems="center" display='flex'>
                    <Box mr={2}>
                        <MenuRoot>
                            <MenuTrigger asChild>
                                <Button>
                                    {t('language')}
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
                    </Box>
                    <Flex alignItems="center">
                        <Text>{user?.email}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;