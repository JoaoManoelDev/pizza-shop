import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface AlertModalProps {
  isPending?: boolean
  onConfirmAction: () => void
}

export const ConfirmOrderCancel = ({ isPending, onConfirmAction }: AlertModalProps) => {
  return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja cancelar o pedido</AlertDialogTitle>
          
          <AlertDialogDescription>
            Ao clicar em confirmar, este pedido será cancelado
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>
          <Button
            onClick={onConfirmAction}
            disabled={isPending}
            className=" w-28"
          >
            {isPending ? (
              <>
                <div className="flex items-center justify-center h-screen">
                  <div className="w-4 h-4 border-[2px] border-white border-solid rounded-full border-t-transparent animate-spin" />
                </div>
              </>
            ) : (
              <span>Confirmar</span>
            )}
     
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
  )
}
