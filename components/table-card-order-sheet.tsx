'use client'

import { useCallback, useEffect, useState } from 'react'
import { FileText } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '@/components/ui/separator'


export function OrderSheet({ order }:{ order: any }) {
  const [cart, setCart] = useState([])

  const supabase = createClientComponentClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from('cart')
        .select(`id, item(id, name, description, photo(id, name, image)), qty, sale, price`)
        .eq('order_id', order.id)

      if (data) {
        setCart(data)
      }
    }

    if (order) { getData() }
  }, [supabase, order, setCart])

  return (
    <Sheet>
      <SheetTrigger>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <FileText className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Order</p>
            <p className="text-sm text-muted-foreground">
              { order.state }
            </p>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Order</SheetTitle>
          <SheetDescription>
            {
              order.id
            }

            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {
              cart.map((product) => {
                const photo = product.item.photo[0]

                return (
                  <li key={ product.id } className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4 space-y-2">
                      <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={ photo.image } alt={ photo.name } />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          { product.item.name }
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          { product.qty }
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        { product.price }
                      </div>
                    </div>
                  </li>
                )
              })
            }
            </ul>


          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}