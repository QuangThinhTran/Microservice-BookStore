<?php

namespace App\repositories\interfaces;

interface IOrderRepository
{
    public function all(array $columns, array $condition, array $relations, $limit, bool $orderByDesc);

    public function create(array $order, $total);

    public function find($id);

    public function update($id, array $data);

    public function delete($id);
}
