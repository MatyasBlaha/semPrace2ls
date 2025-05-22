export default function Page({params}: {params: {employeeId: string}}){
    const employeeId = params.employeeId
    return (
        <>
            {employeeId}
        </>
    )
}