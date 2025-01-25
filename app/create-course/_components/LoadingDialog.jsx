import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader
} from "@/components/ui/alert-dialog"
import Image from "next/image"

function LoadingDialog({ loading }) {
    return (
        <div>
            <AlertDialog open={loading}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogDescription>
                            <div className="flex flex-col items-center py-10">
                                <Image src={'/loader.gif'} width={100} height={100} alt="Loader" />
                                <h2>Please Wait... AI Working on your Course</h2>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default LoadingDialog
