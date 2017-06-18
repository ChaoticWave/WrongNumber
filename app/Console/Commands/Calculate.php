<?php namespace ChaoticWave\WrongNumber\Console\Commands;

use ChaoticWave\BlueVelvet\Traits\ConsoleHelper;
use ChaoticWave\WrongNumber\Ciphers\CipherManager;

class Calculate extends AppCommand
{
    //******************************************************************************
    //* Traits
    //******************************************************************************

    use ConsoleHelper;

    //******************************************************************************
    //* Members
    //******************************************************************************

    /** @inheritdoc */
    protected $signature = 'wn:calculate {text} {--systems=}';
    /** @inheritdoc */
    protected $description = 'Calculates the gematria for "text"';

    //******************************************************************************
    //* Methods
    //******************************************************************************

    /** @inheritdoc */
    public function handle()
    {
        $_text = $this->argument('text');
        $_systems = trim(strtolower($this->option('systems')));
        $_manager = new CipherManager();

        if (empty($_systems)) {
            $_systems = $_manager->getSystems(true);
        } else {
            $_systems = explode(',', $_systems);
        }

        foreach ($_systems as $_system) {
            $this->applyCipher($_text, $_system);
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
        $_value = CipherManager::make($system)->calculate($text);

        $this->writeln('<info>The value of "' . $text . '" in ' . studly_case($system) . ' gematria is: <comment>' . $_value . '</comment></info>');
    }
}
