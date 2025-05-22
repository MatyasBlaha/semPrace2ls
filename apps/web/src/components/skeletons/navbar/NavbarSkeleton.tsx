// components/NavbarSkeleton.tsx
import { Flex, Box, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'

export default function NavbarSkeleton() {
    return (
        <Box bg="gray.100" px={4}>
            <Flex h={16} align="center" justify="space-between">
                {/* your brand/logo placeholder */}
                <Skeleton height="24px" width="100px" />

                {/* right‐hand side: language button + user name */}
                <Stack direction="row" align="center" spacing={4}>
                    {/* language button placeholder */}
                    <Skeleton height="32px" width="80px" borderRadius="md" />

                    {/* user name avatar/initial */}
                    <SkeletonCircle size="32px" />
                </Stack>
            </Flex>
        </Box>
    )
}