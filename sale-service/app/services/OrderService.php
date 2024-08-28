<?php

namespace App\services;

use App\repositories\interfaces\IOrderRepository;

class OrderService
{
    private IOrderRepository $orderRepository;

    public function __construct(IOrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * Checkout
     * @param $data
     */
    public function checkout($data)
    {
        $total = $this->sumTotal($data);
        $order = $this->orderRepository->create($data, $total);
        $order->storeOrderDetail($data['order_details']);
        return $order;
    }

    /**
     * Sum total
     * @param $data
     * @return float|int
     */
    public function sumTotal($data): float|int
    {
        $total = 0;
        foreach ($data['order_details'] as $orderDetail) {
            $total += $orderDetail['price'] * $orderDetail['quantity'];
        }
        return $total;
    }
}
