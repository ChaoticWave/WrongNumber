<?php namespace ChaoticWave\WrongNumber\Ciphers;

use Illuminate\Foundation\Application;
use Illuminate\Support\Manager;

class CipherManager extends Manager
{
    //******************************************************************************
    //* Constants
    //******************************************************************************

    /**
     * @var string The namespace of the ciphers
     */
    const KEY_NAMESPACE = 'ChaoticWave\\WrongNumber\\Ciphers\\';

    //******************************************************************************
    //* Members
    //******************************************************************************

    /**
     * @var array
     */
    protected $systems;

    //******************************************************************************
    //* Methods
    //******************************************************************************

    /**
     * Constructor
     *
     * @param \Illuminate\Foundation\Application $app
     */
    public function __construct(Application $app = null)
    {
        parent::__construct($app ?: app());

        $this->systems = config('ciphers.systems');
    }

    /**
     * @param string|null $name
     * @param array|null  $key
     *
     * @return \ChaoticWave\WrongNumber\Contracts\CipherLike
     */
    public static function make($name = null, $key = null)
    {
        $_service = new static(app());

        return $_service->createDriver($name, $key);
    }

    /**
     * Create a new driver instance.
     *
     * @param string     $driver
     * @param array|null $key
     *
     * @return \ChaoticWave\WrongNumber\Contracts\CipherLike
     */
    protected function createDriver($driver, $key = null)
    {
        if (!empty($this->customCreators[$driver])) {
            return $this->callCustomCreator($driver);
        }

        $_class = static::KEY_NAMESPACE . studly_case($driver);

        try {
            if (class_exists($_class)) {
                return new $_class($driver, $key);
            }
        } catch (\Exception $_ex) {
            //  Ignored
        }

        throw new \InvalidArgumentException('Cipher driver "' . $driver . '" is not supported.');
    }

    /**
     * Get the default driver name.
     *
     * @return string
     */
    public function getDefaultDriver()
    {
        return Simple::SYSTEM;
    }

    /**
     * @param bool $keys If true, return only the system keys
     *
     * @return array
     */
    public function getSystems($keys = false)
    {
        return $keys ? array_keys($this->systems) : $this->systems;
    }
}
