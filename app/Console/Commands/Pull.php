<?php namespace ChaoticWave\WrongNumber\Console\Commands;

use ChaoticWave\WrongNumber\Ciphers\CipherManager;
use FeedIo\Factory;

class Pull extends AppCommand
{
    //******************************************************************************
    //* Members
    //******************************************************************************

    /** @inheritdoc */
    protected $signature = 'wn:pull {--feed=}';
    /** @inheritdoc */
    protected $description = 'Pull an RSS feed';

    //******************************************************************************
    //* Methods
    //******************************************************************************

    /** @inheritdoc */
    public function handle()
    {
        $_feed = $this->option('feed');

        return $this->readFeed($_feed);
    }

    protected function readFeed($feed = null)
    {
        $_feeds = empty($feed) ? config('feeds', []) : [$feed];
        $_ioFeed = Factory::create()->getFeedIo();

        foreach ($_feeds as $_id => $_url) {
            $this->writeln('Reading ' . $_id . ': ' . $_url);
            $_result = $_ioFeed->readSince($_url, new \DateTime('-30 days'));

            // get title
            $_feedTitle = $_result->getFeed()->getTitle();
            $this->writeln('Feed: ' . $_feedTitle);

            // iterate through items
            foreach ($_result->getFeed() as $_item) {
                $_item->
                $this->writeln('Title: ' . $_item->getTitle());
            }
        }
    }

    /**
     * Calculates the value of $text
     *
     * @param string $text
     * @param string $system
     */
    protected function applyCipher($text, $system)
    {
        $_reduced = 0;
        $_value = CipherManager::make($system)->calculate($text, $_reduced);

        $this->writeln('<info>The value of "' .
            $text .
            '" in ' .
            studly_case($system) .
            ' gematria is: <comment>' .
            $_value .
            ' (' .
            $_reduced .
            ')</comment></info>');
    }
}
