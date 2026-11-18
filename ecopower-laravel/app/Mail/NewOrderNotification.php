<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/** Email envoyé à l'équipe EcoPower à chaque nouvelle commande. */
class NewOrderNotification extends Mailable
{
    /**
     * @param  object  $order  Ligne de la table orders
     * @param  iterable  $items  Lignes de la table order_items
     */
    public function __construct(public object $order, public iterable $items)
    {
    }

    public function envelope(): Envelope
    {
        $o = $this->order;

        return new Envelope(
            subject: sprintf('Nouvelle commande %s - %s - %s TND', $o->id, $o->customer_name, number_format((float) $o->total, 2, ',', ' ')),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.new-order',
            with: [
                'order' => $this->order,
                'items' => $this->items,
                'adminUrl' => rtrim((string) config('app.url'), '/').'/admin',
            ],
        );
    }
}
