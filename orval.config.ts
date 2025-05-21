import { defineConfig } from "orval";

export default defineConfig({
    api: {
        input: './apps/api/openapi.yaml',
        output: {
            target: './apps/web/hooks/api/generated.ts',
            schemas: './apps/web/hooks/api/model',
            client: 'react-query',
            mock: false,
            override: {
                mutator: {
                    path: './apps/web/hooks/api/custom-axios.ts',
                    name: 'customInstance',
                },
            },
        },
        client: {
            credentials: true
        }
    },
})