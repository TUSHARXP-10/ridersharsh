<?php
use PHPUnit\Framework\TestCase;

class ProfileTest extends TestCase
{
    private $app;
    private $database;

    protected function setUp(): void
    {
        $this->app = require __DIR__ . '/../src/index.php';
        $factory = (new \Kreait\Firebase\Factory)
            ->withServiceAccount(__DIR__ . '/../firebase-credentials.json');
        $this->database = $factory->createDatabase();
    }

    public function testGetUserProfile()
    {
        $userId = 'test-user-123';
        $testProfile = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '1234567890',
            'preferences' => [
                'notifications' => true,
                'language' => 'en'
            ]
        ];

        // Setup test data
        $this->database->getReference('users/' . $userId)->set($testProfile);

        $response = $this->createRequest('GET', "/api/profile/{$userId}")
            ->withHeader('Authorization', 'Bearer test-token');
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($responseData['success']);
        $this->assertEquals($testProfile['name'], $responseData['profile']['name']);
        $this->assertEquals($testProfile['email'], $responseData['profile']['email']);

        // Cleanup
        $this->database->getReference('users/' . $userId)->remove();
    }

    public function testUpdateProfile()
    {
        $userId = 'test-user-456';
        $initialProfile = [
            'name' => 'Initial Name',
            'email' => 'initial@example.com',
            'phone' => '1234567890'
        ];

        // Setup initial profile
        $this->database->getReference('users/' . $userId)->set($initialProfile);

        $updateData = [
            'name' => 'Updated Name',
            'phone' => '9876543210'
        ];

        $response = $this->createRequest('PUT', "/api/profile/{$userId}", $updateData)
            ->withHeader('Authorization', 'Bearer test-token');
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($responseData['success']);

        // Verify update
        $updatedProfile = $this->database->getReference('users/' . $userId)->getValue();
        $this->assertEquals($updateData['name'], $updatedProfile['name']);
        $this->assertEquals($updateData['phone'], $updatedProfile['phone']);

        // Cleanup
        $this->database->getReference('users/' . $userId)->remove();
    }

    public function testUpdatePreferences()
    {
        $userId = 'test-user-789';
        $initialPreferences = [
            'notifications' => true,
            'language' => 'en',
            'theme' => 'light'
        ];

        // Setup initial preferences
        $this->database->getReference('users/' . $userId . '/preferences')
            ->set($initialPreferences);

        $newPreferences = [
            'notifications' => false,
            'theme' => 'dark'
        ];

        $response = $this->createRequest(
            'PUT',
            "/api/profile/{$userId}/preferences",
            $newPreferences
        )->withHeader('Authorization', 'Bearer test-token');

        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($responseData['success']);

        // Verify preferences update
        $updatedPreferences = $this->database->getReference('users/' . $userId . '/preferences')
            ->getValue();
        $this->assertEquals($newPreferences['notifications'], $updatedPreferences['notifications']);
        $this->assertEquals($newPreferences['theme'], $updatedPreferences['theme']);

        // Cleanup
        $this->database->getReference('users/' . $userId)->remove();
    }

    public function testInvalidProfileUpdate()
    {
        $userId = 'test-user-999';
        $invalidData = [
            'email' => 'invalid-email'
        ];

        $response = $this->createRequest('PUT', "/api/profile/{$userId}", $invalidData)
            ->withHeader('Authorization', 'Bearer test-token');
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(400, $response->getStatusCode());
        $this->assertFalse($responseData['success']);
        $this->assertArrayHasKey('error', $responseData);
    }

    private function createRequest(string $method, string $path, array $data = [])
    {
        $request = $this->createRequest($method, $path)
            ->withHeader('Content-Type', 'application/json');

        if (!empty($data)) {
            $request->getBody()->write(json_encode($data));
        }

        return $this->app->handle($request);
    }
}