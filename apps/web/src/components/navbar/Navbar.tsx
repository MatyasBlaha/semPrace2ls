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

const Navbar = () => {
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
                    <Flex alignItems="center">
                        <Text>"name"</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;